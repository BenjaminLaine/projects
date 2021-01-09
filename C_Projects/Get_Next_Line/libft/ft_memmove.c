/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_memmove.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/17 15:11:06 by blaine            #+#    #+#             */
/*   Updated: 2019/11/05 23:55:18 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "./includes/libft.h"

void	*ft_memmove(void *dest, const void *src, size_t len)
{
	int i;

	i = 0;
	if (len > 0 && (dest || src))
	{
		if (dest < src)
			while (len)
			{
				*((char*)dest + i) = *((char*)src + i);
				len--;
				i++;
			}
		else
			while (len--)
			{
				*((char*)dest + len) = *((char*)src + len);
			}
	}
	return (dest);
}
