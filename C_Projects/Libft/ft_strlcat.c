/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strlcat.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/18 15:43:06 by blaine            #+#    #+#             */
/*   Updated: 2019/10/25 00:02:19 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

size_t	ft_strlcat(char *dest, const char *src, size_t dstsize)
{
	size_t dest_i;
	size_t src_i;
	size_t i;

	dest_i = ft_strlen(dest);
	src_i = ft_strlen(src);
	if (dest_i >= dstsize)
		return (src_i + dstsize);
	i = dest_i;
	while (i < dstsize - 1 && *src)
		dest[i++] = *(src++);
	dest[i] = '\0';
	return (dest_i + src_i);
}
