/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strncpy.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/17 14:08:01 by blaine            #+#    #+#             */
/*   Updated: 2019/10/24 21:11:27 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

char	*ft_strncpy(char *dest, const char *src, size_t len)
{
	int i;

	i = 0;
	while (src[i] && len > 0)
	{
		dest[i] = src[i];
		i++;
		len--;
	}
	while (len > 0)
	{
		dest[i++] = '\0';
		len--;
	}
	return (dest);
}
